import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

let browserClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

function getBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key not configured');
  }
  browserClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'x-application-name': 'clinova',
      },
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });
  return browserClient;
}

function getAdminClient(): SupabaseClient {
  if (adminClient) return adminClient;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase Service Role Key not configured');
  }
  adminClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'x-application-name': 'clinova-admin',
      },
    },
  });
  return adminClient;
}

export const supabase = getBrowserClient();
export const supabaseAdmin = (() => {
  try {
    return getAdminClient();
  } catch {
    return null;
  }
})();

export async function refreshSession() {
  const client = getBrowserClient();
  const { data, error } = await client.auth.refreshSession();
  if (error) throw error;
  return data.session;
}

export async function getCurrentUser() {
  const client = getBrowserClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error) throw error;
  return user;
}

export async function signOut() {
  const client = getBrowserClient();
  await client.auth.signOut();
}

export function subscribeToChanges(
  table: string,
  callback: (payload: any) => void,
  filter?: string
) {
  const client = getBrowserClient();
  let channel = client.channel(`public:${table}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table,
        filter,
      },
      callback
    )
    .subscribe();
  return () => {
    client.removeChannel(channel);
  };
}

export function subscribeToRealtime(
  table: string,
  events: ('INSERT' | 'UPDATE' | 'DELETE')[],
  callback: (payload: any) => void,
  filter?: string
) {
  const client = getBrowserClient();
  const channel = client
    .channel(`realtime:${table}`)
    .on(
      'postgres_changes',
      {
        event: events,
        schema: 'public',
        table,
        filter,
      },
      callback
    )
    .subscribe();
  return () => client.removeChannel(channel);
}

export function useRealtimeSubscription(
  table: string,
  events: ('INSERT' | 'UPDATE' | 'DELETE')[],
  callback: (payload: any) => void,
  filter?: string,
  enabled = true
) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const connect = async () => {
      try {
        const client = getBrowserClient();
        const channelName = `realtime:${supabase.channel('realtime:${Math.random()}').topic}`;
        const channel = supabase
          .channel(`realtime:${table}`)
          .on(
            'postgres_changes',
            {
              event: events,
              schema: 'public',
              table,
              filter,
            },
            (payload) => {
              if (isMounted) callback(payload);
            }
          )
          .subscribe((status) => {
            if (isMounted) {
              setIsConnected(status === 'SUBSCRIBED');
            }
          });

        channel = supabase.channel(channelName);
      } catch (err) {
        if (isMounted) setError(err as Error);
      }
    };

    connect();
    return () => {
      isMounted = false;
      channel?.unsubscribe();
    };
  }, [table, events, filter, enabled, callback]);

  return { isConnected, error };
}

export async function batchUpsert(
  table: string,
  records: Record<string, any>[],
  onConflict: string,
  batchSize = 100
) {
  const client = getAdminClient();
  const results = [];

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    const { data, error } = await client
      .from(table)
      .upsert(batch, { onConflict, ignoreDuplicates: false });
    if (error) throw error;
    results.push(...(data || []));
  }

  return results;
}

export async function batchInsert(
  table: string,
  records: Record<string, any>[],
  batchSize = 100
) {
  const client = getAdminClient();
  const results = [];

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    const { data, error } = await client
      .from(table)
      .insert(batch);
    if (error) throw error;
    results.push(...(data || []));
  }

  return results;
}

export async function bulkDelete(
  table: string,
  ids: string[],
  idColumn = 'id',
  batchSize = 100
) {
  const client = getAdminClient();

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const { error } = await client
      .from(table)
      .delete()
      .in(idColumn, batch);
    if (error) throw error;
  }
}

export async function getPaginatedResults<T>(
  table: string,
  options: {
    page: number;
    pageSize: number;
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
    filters?: Record<string, any>;
    search?: { column: string; query: string };
  }
) {
  const client = getBrowserClient();
  const { page, pageSize, select = '*', orderBy, filters = {}, search } = options;

  let query = client.from(table).select(select, { count: 'exact' });

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query = query.eq(key, value);
    }
  });

  if (search) {
    query = query.ilike(search.column, `%${search.query}%`);
  }

  if (orderBy) {
    query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    data: data || [],
    count: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

export function useRealtimeQuery<T>(
  table: string,
  queryOptions: {
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
    filters?: Record<string, any>;
    limit?: number;
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const fetchInitialData = async () => {
      try {
        const client = getBrowserClient();
        let query = client.from(table).select(queryOptions.select || '*');

        if (queryOptions.filters) {
          Object.entries(queryOptions.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              query = query.eq(key, value);
            }
          });
        }

        if (queryOptions.orderBy) {
          query = query.order(queryOptions.orderBy.column, { 
            ascending: queryOptions.orderBy.ascending ?? false 
          });
        }

        if (queryOptions.limit) {
          query = query.limit(queryOptions.limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        if (isMounted) {
          setData(data || []);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    };

    fetchInitialData();

    const channel = supabase
      .channel(`realtime:${table}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table,
        },
        (payload) => {
          if (!isMounted) return;
          
          setData(prev => {
            switch (payload.eventType) {
              case 'INSERT':
                return [payload.new as T, ...prev];
              case 'UPDATE':
                return prev.map(item => 
                  (item as any).id === payload.new.id ? payload.new : item
                );
              case 'DELETE':
                return prev.filter(item => (item as any).id !== payload.old.id);
              default:
                return prev;
            }
          });
        })
      .subscribe();

    return () => {
      isMounted = false;
      channel?.unsubscribe();
    };
  }, []);

  return { data, loading, error };
}

function useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void] {
  // This is a placeholder - actual implementation uses React's useState
  // This file is for the hook implementation only
  return [initial, () => {}];
}

function useEffect(effect: () => void | (() => void), deps?: any[]) {
  // Placeholder
}

function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T {
  return callback;
}

function useRef<T>(initial: T): { current: T } {
  return { current: initial };
}

export { getBrowserClient, getAdminClient };