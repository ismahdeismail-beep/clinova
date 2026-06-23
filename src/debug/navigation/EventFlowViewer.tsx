import { useState, useEffect, useMemo } from 'react';
import { EventBus } from '../../engine/EventBus';

interface EventEntry {
  type: string;
  data: unknown;
  timestamp: number;
}

interface EventFlowViewerProps {
  eventBus: EventBus;
  maxEvents?: number;
}

export function EventFlowViewer({ eventBus, maxEvents = 50 }: EventFlowViewerProps) {
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [filter, setFilter] = useState('');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const unsubscribe = eventBus.on('*', (args: unknown[], event: string) => {
      if (!paused) {
        setEvents(prev => {
          const next = [{ type: event, data: args[0], timestamp: Date.now() }, ...prev];
          return next.slice(0, maxEvents);
        });
      }
    });

    return () => { unsubscribe(); };
  }, [eventBus, maxEvents, paused]);

  const filteredEvents = useMemo(() => {
    if (!filter) return events;
    return events.filter(e => e.type.toLowerCase().includes(filter.toLowerCase()));
  }, [events, filter]);

  const eventColors: Record<string, string> = {
    'workflow': '#00E5FF',
    'node': '#34D399',
    'firebase': '#F59E0B',
    'sync': '#8B5CF6',
    'engine': '#EC4899',
    'audit': '#6366F1',
    'state': '#14B8A6',
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-[#1E1E28] flex items-center gap-2">
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filter events..."
          className="flex-1 bg-[#1E1E28] text-white text-xs px-3 py-1.5 rounded border border-[#2D2D35] focus:outline-none focus:border-[#00E5FF]"
        />
        <button
          onClick={() => setPaused(!paused)}
          className={`px-2 py-1 text-xs rounded ${paused ? 'bg-[#F59E0B] text-black' : 'bg-[#1E1E28] text-[#A0A0B0]'}`}
        >
          {paused ? 'PAUSED' : 'LIVE'}
        </button>
        <button
          onClick={() => setEvents([])}
          className="px-2 py-1 text-xs bg-[#1E1E28] text-[#A0A0B0] rounded hover:text-white"
        >
          CLEAR
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredEvents.length === 0 && (
          <div className="text-[#6B7280] text-xs text-center py-8">
            {events.length === 0 ? 'Waiting for events...' : 'No matching events'}
          </div>
        )}
        {filteredEvents.map((event, i) => {
          const prefix = event.type.split(':')[0];
          const color = eventColors[prefix] || '#6B7280';
          const time = new Date(event.timestamp).toLocaleTimeString();

          return (
            <div key={i} className="flex items-start gap-2 text-xs py-1 px-2 rounded hover:bg-[#1E1E28] transition-colors">
              <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[#6B7280] flex-shrink-0 w-16">{time}</span>
              <span className="text-[#A0A0B0] font-medium">{event.type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
