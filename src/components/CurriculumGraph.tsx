import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, RotateCcw, Search, Sliders, Info, BookOpen, 
  Activity, Award, Sparkles, X, ChevronRight, Play, Compass, Filter
} from 'lucide-react';
import { EDUCATION_MODULES as MODULES, getModuleUnits } from '../data/educationHubData';
import { INITIAL_CASES, DISEASES_BY_SPECIALTY } from '../data/clinicalCasesData';

// Define Node and Link interfaces for D3 Graph
interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'root' | 'subject' | 'unit' | 'condition' | 'case';
  description?: string;
  group?: string;
  color?: string;
  size: number;
  data?: any;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  type: 'hierarchy' | 'integration';
}

// Specialty to Unit mapping to represent cross-disciplinary curriculum links
const SPECIALTY_TO_UNITS: Record<string, string[]> = {
  'Cardiovascular Pharmacotherapy': ['cp-cv', 'pharm-cv', 'cc-cv'],
  'Respiratory Pharmacotherapy': ['cp-resp', 'pharm-resp', 'cc-resp'],
  'Infectious Diseases & Antimicrobial Pharmacotherapy': ['cp-id', 'pharm-anti', 'cc-id'],
  'Endocrine Pharmacotherapy': ['cp-endo', 'pharm-endo', 'cc-endo'],
  'Gastrointestinal Pharmacotherapy': ['cp-gi', 'pharm-gi', 'cc-gi'],
  'Renal & Electrolyte Pharmacotherapy': ['cp-renal', 'pharm-renal', 'cc-renal'],
  'Central Nervous System Pharmacotherapy': ['cp-neuro', 'cp-psych', 'pharm-cns', 'cc-neuro', 'cc-psych'],
  'Haematology & Oncology Pharmacotherapy': ['cp-onc', 'cp-hem', 'pharm-onc', 'cc-onc', 'cc-hem'],
  'Rheumatology & Musculoskeletal Pharmacotherapy': ['cc-em'], // Linked generally or specifically if needed
  'Obstetrics & Gynaecology Pharmacotherapy': ['cp-obgyn', 'cc-obgyn'],
  'Paediatric Pharmacotherapy': ['cp-peds', 'cc-peds'],
  'Geriatric Pharmacotherapy': ['cp-ger'],
  'Dermatology Pharmacotherapy': ['cc-em'],
  'Ophthalmology Pharmacotherapy': ['cc-em'],
  'ENT Pharmacotherapy': ['cc-em'],
  'Emergency & Critical Care': ['cp-em', 'cp-cc', 'cc-em'],
  'Toxicology & Poison Management': ['cp-em', 'cc-em']
};

export default function CurriculumGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Graph state and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Filter categories
  const [visibleTypes, setVisibleTypes] = useState({
    root: true,
    subject: true,
    unit: true,
    condition: true,
    case: true
  });

  // Force simulation parameters
  const [chargeStrength, setChargeStrength] = useState(-180);
  const [linkDistance, setLinkDistance] = useState(65);
  const [collisionRadius, setCollisionRadius] = useState(24);

  // References to keep simulation reactive
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // 1. Generate full curriculum graph dataset
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Add Central Root
    nodes.push({
      id: 'root',
      label: 'Clinova Curriculum',
      type: 'root',
      description: 'The unified clinical academic ecosystem connecting basic sciences, therapeutics, and patient outcomes.',
      size: 26,
      color: '#6366f1' // Deep Indigo
    });

    // Add Subject Nodes from MODULES
    MODULES.forEach(mod => {
      // Establish customized branding colors
      let color = '#3b82f6'; // default blue
      if ((mod as any).color === 'indigo') color = '#6366f1';
      else if ((mod as any).color === 'red') color = '#ef4444';
      else if ((mod as any).color === 'orange') color = '#f97316';
      else if ((mod as any).color === 'teal') color = '#14b8a6';
      else if ((mod as any).color === 'sky') color = '#0ea5e9';
      else if ((mod as any).color === 'emerald') color = '#10b981';
      else if ((mod as any).color === 'fuchsia') color = '#d946ef';

      nodes.push({
        id: mod.id,
        label: mod.title,
        type: 'subject',
        description: mod.description,
        group: mod.id,
        size: 19,
        color
      });

      links.push({
        source: 'root',
        target: mod.id,
        type: 'hierarchy'
      });

      // Add Units from the canonical curriculum
      const moduleUnits = getModuleUnits(mod.id);
      moduleUnits.forEach(unit => {
        nodes.push({
          id: unit.id,
          label: unit.title,
          type: 'unit',
          description: unit.description,
          group: mod.id,
          size: 13,
          color: `${color}cc`,
          data: unit
        });

        links.push({
          source: mod.id,
          target: unit.id,
          type: 'hierarchy'
        });
      });
    });

    // Add Conditions (Diseases) and link them to respective Units
    Object.entries(DISEASES_BY_SPECIALTY).forEach(([specialty, diseases]) => {
      const targetUnitIds = SPECIALTY_TO_UNITS[specialty] || [];

      diseases.forEach(disease => {
        const diseaseId = `disease-${disease.replace(/\s+/g, '-').toLowerCase()}`;
        
        // Add disease condition node
        nodes.push({
          id: diseaseId,
          label: disease,
          type: 'condition',
          description: `Core pathological condition within ${specialty}. Highly integrated across physiology and clinical therapeutics.`,
          group: 'clinical_pharm',
          size: 9,
          color: '#f59e0b' // Clinical Amber
        });

        // Link disease to ALL corresponding Unit nodes (e.g. pharmacology AND therapeutics!)
        targetUnitIds.forEach(uId => {
          // Verify if unit exists in nodes array
          if (nodes.some(n => n.id === uId)) {
            links.push({
              source: uId,
              target: diseaseId,
              type: 'integration'
            });
          }
        });
      });
    });

    // Add Patient Cases and link to respective Conditions
    INITIAL_CASES.forEach(c => {
      const diseaseNodeId = `disease-${c.disease.replace(/\s+/g, '-').toLowerCase()}`;
      
      nodes.push({
        id: c.id,
        label: `${c.patientName} (${c.difficulty})`,
        type: 'case',
        description: `Patient Case study: ${c.title}. Chief Complaint: ${c.chiefComplaint}`,
        group: 'cases',
        size: 7,
        color: '#f43f5e', // Patient Crimson/Rose
        data: c
      });

      // Link disease to case
      if (nodes.some(n => n.id === diseaseNodeId)) {
        links.push({
          source: diseaseNodeId,
          target: c.id,
          type: 'hierarchy'
        });
      }
    });

    return { nodes, links };
  }, []);

  // Filter nodes and links based on search queries & active visibility filters
  const filteredData = useMemo(() => {
    // 1. Filter out nodes not visible by type
    const query = searchQuery.toLowerCase().trim();
    
    let activeNodes = graphData.nodes.filter(n => visibleTypes[n.type]);

    // If search query is active, only include matched nodes AND their immediate neighbors/ancestors
    if (query) {
      const matchedNodeIds = new Set<string>();
      
      // First pass: find direct matches
      graphData.nodes.forEach(n => {
        if (
          n.label.toLowerCase().includes(query) ||
          (n.description || '').toLowerCase().includes(query) ||
          (n.type || '').toLowerCase().includes(query)
        ) {
          matchedNodeIds.add(n.id);
        }
      });

      // Second pass: include parents, children or connected nodes to retain graph context
      const expandedNodeIds = new Set<string>(matchedNodeIds);
      graphData.links.forEach(l => {
        const srcId = typeof l.source === 'string' ? l.source : l.source.id;
        const tgtId = typeof l.target === 'string' ? l.target : l.target.id;
        
        if (matchedNodeIds.has(srcId)) expandedNodeIds.add(tgtId);
        if (matchedNodeIds.has(tgtId)) expandedNodeIds.add(srcId);
      });

      activeNodes = graphData.nodes.filter(n => expandedNodeIds.has(n.id) && visibleTypes[n.type]);
    }

    const activeNodeIds = new Set(activeNodes.map(n => n.id));

    // Filter links to only connect active nodes
    const activeLinks = graphData.links.filter(l => {
      const srcId = typeof l.source === 'string' ? l.source : l.source.id;
      const tgtId = typeof l.target === 'string' ? l.target : l.target.id;
      return activeNodeIds.has(srcId) && activeNodeIds.has(tgtId);
    });

    // Deep copy nodes/links to avoid mutating original source data in simulations
    const copiedNodes = activeNodes.map(n => ({ ...n }));
    const copiedLinks = activeLinks.map(l => ({
      ...l,
      source: typeof l.source === 'string' ? l.source : l.source.id,
      target: typeof l.target === 'string' ? l.target : l.target.id
    }));

    return { nodes: copiedNodes, links: copiedLinks };
  }, [graphData, visibleTypes, searchQuery]);

  // Create D3 Force Simulation
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 550;

    // Clear previous graph contents
    svg.selectAll('*').remove();

    // Create container group for zoom/pan
    const g = svg.append('g').attr('class', 'graph-content');

    // Create zoom behavior
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.15, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    
    svg.call(zoomBehavior);
    zoomBehaviorRef.current = zoomBehavior;

    // Standardize links source/target IDs
    const nodes = filteredData.nodes;
    const links = filteredData.links;

    // Create D3 simulation
    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links)
        .id(d => d.id)
        .distance(linkDistance)
      )
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<GraphNode>().radius((d: any) => d.size + collisionRadius));

    simulationRef.current = simulation;

    // 1. Draw Links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', d => d.type === 'integration' ? 'var(--primary)' : 'var(--border)')
      .attr('stroke-opacity', d => d.type === 'integration' ? 0.75 : 0.4)
      .attr('stroke-width', d => d.type === 'integration' ? 1.5 : 1)
      .attr('stroke-dasharray', d => d.type === 'integration' ? '3,3' : 'none');

    // 2. Draw Nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
        // Highlight active nodes in SVG
        highlightSelectedBranch(d.id);
      })
      .on('mouseenter', (event, d) => {
        setHoveredNode(d);
        // Dim outer nodes/links
        d3.selectAll('.node-circle').attr('opacity', 0.35);
        d3.selectAll('.node-label').attr('opacity', 0.2);
        d3.selectAll('line').attr('stroke-opacity', 0.1);

        // Highlight this node and its immediate neighbors
        const connectedIds = new Set<string>([d.id]);
        links.forEach(l => {
          const sId = typeof l.source === 'object' ? (l.source as any).id : l.source;
          const tId = typeof l.target === 'object' ? (l.target as any).id : l.target;
          if (sId === d.id) connectedIds.add(tId as string);
          if (tId === d.id) connectedIds.add(sId as string);
        });

        // Restore highlighted opacity
        d3.selectAll('.node-group')
          .filter((n: any) => connectedIds.has(n.id))
          .selectAll('.node-circle')
          .attr('opacity', 1);

        d3.selectAll('.node-group')
          .filter((n: any) => connectedIds.has(n.id))
          .selectAll('.node-label')
          .attr('opacity', 1);

        d3.selectAll('line')
          .filter((l: any) => {
            const sId = typeof l.source === 'object' ? l.source.id : l.source;
            const tId = typeof l.target === 'object' ? l.target.id : l.target;
            return sId === d.id || tId === d.id;
          })
          .attr('stroke-opacity', 0.9)
          .attr('stroke-width', 2);
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
        // Restore all standard opacities
        d3.selectAll('.node-circle').attr('opacity', 1);
        d3.selectAll('.node-label').attr('opacity', (n: any) => 
          n.type === 'root' || n.type === 'subject' || n.type === 'unit' ? 1 : 0.4
        );
        d3.selectAll('line')
          .attr('stroke-opacity', (l: any) => l.type === 'integration' ? 0.75 : 0.4)
          .attr('stroke-width', (l: any) => l.type === 'integration' ? 1.5 : 1);
      })
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    // Draw background rings & circles
    node.append('circle')
      .attr('class', 'node-circle')
      .attr('r', d => d.size)
      .attr('fill', d => d.color || '#94a3b8')
      .attr('stroke', 'var(--bg)')
      .attr('stroke-width', 2)
      .attr('filter', d => d.type === 'root' || d.type === 'subject' ? 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' : 'none');

    // Draw custom visual indicator on the circles for root/subject
    node.filter(d => d.type === 'root' || d.type === 'subject')
      .append('circle')
      .attr('r', d => d.size - 5)
      .attr('fill', 'none')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.5);

    // 3. Draw Labels
    node.append('text')
      .attr('class', 'node-label')
      .attr('dx', d => d.size + 6)
      .attr('dy', '.35em')
      .text(d => d.label)
      .attr('font-size', d => d.type === 'root' ? '12px' : d.type === 'subject' ? '11px' : '9px')
      .attr('font-weight', d => d.type === 'root' || d.type === 'subject' ? '800' : '600')
      .attr('fill', 'var(--text)')
      .attr('opacity', d => d.type === 'root' || d.type === 'subject' || d.type === 'unit' ? 1 : 0.4);

    // Tick listener
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x!)
        .attr('y1', d => (d.source as any).y!)
        .attr('x2', d => (d.target as any).x!)
        .attr('y2', d => (d.target as any).y!);

      node
        .attr('transform', d => `translate(${d.x!}, ${d.y!})`);
    });

    // Handle drag behaviors
    function dragstarted(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Interactive helper to highlight current sub-tree selection
    function highlightSelectedBranch(nodeId: string) {
      d3.selectAll('.node-circle').attr('stroke', 'var(--bg)').attr('stroke-width', 2);
      
      d3.selectAll('.node-group')
        .filter((n: any) => n.id === nodeId)
        .selectAll('.node-circle')
        .attr('stroke', 'var(--primary)')
        .attr('stroke-width', 4);
    }

    // Initial positioning simulation burst
    for (let i = 0; i < 60; ++i) simulation.tick();

    // Trigger auto-focus on Central Root on initial mount
    zoomToNode('root', 0.85);

  }, [filteredData, chargeStrength, linkDistance, collisionRadius]);

  // Center/Zoom helper
  const zoomToNode = (nodeId: string, scale = 1.2) => {
    if (!svgRef.current || !containerRef.current || !zoomBehaviorRef.current) return;
    
    const targetNode = filteredData.nodes.find(n => n.id === nodeId);
    if (!targetNode) return;

    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 550;

    const svg = d3.select(svgRef.current);
    
    svg.transition()
      .duration(750)
      .call(
        zoomBehaviorRef.current.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(scale)
          .translate(-targetNode.x!, -targetNode.y!)
      );
  };

  // Reset viewport
  const handleResetView = () => {
    setSelectedNode(null);
    zoomToNode('root', 0.8);
  };

  // Visibility toggle
  const toggleVisibility = (type: keyof typeof visibleTypes) => {
    setVisibleTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xs overflow-hidden h-[600px] flex flex-col relative animate-in fade-in duration-300">
      
      {/* Top action control bar */}
      <div className="p-4 border-b border-[var(--border)] bg-[var(--surface)] flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg">
            <Compass size={18} />
          </div>
          <div>
            <h3 className="text-sm font-black text-[var(--text)] uppercase tracking-wider">Curriculum Integration Map</h3>
            <p className="text-[10px] text-[var(--text-muted)] font-semibold">Interactive, D3-powered multi-tier force ontology</p>
          </div>
        </div>

        {/* Live Filter Tags & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Node Category Toggles */}
          <div className="flex flex-wrap gap-1 items-center bg-[var(--surface-dim)] p-1 rounded-xl border border-[var(--border)]">
            <button
              onClick={() => toggleVisibility('subject')}
              className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition-all ${visibleTypes.subject ? 'bg-[var(--surface)] text-[var(--text)] shadow-xs' : 'text-[var(--text-muted)] opacity-60'}`}
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Subjects
            </button>
            <button
              onClick={() => toggleVisibility('unit')}
              className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition-all ${visibleTypes.unit ? 'bg-[var(--surface)] text-[var(--text)] shadow-xs' : 'text-[var(--text-muted)] opacity-60'}`}
            >
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              Units
            </button>
            <button
              onClick={() => toggleVisibility('condition')}
              className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition-all ${visibleTypes.condition ? 'bg-[var(--surface)] text-[var(--text)] shadow-xs' : 'text-[var(--text-muted)] opacity-60'}`}
            >
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              Conditions
            </button>
            <button
              onClick={() => toggleVisibility('case')}
              className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition-all ${visibleTypes.case ? 'bg-[var(--surface)] text-[var(--text)] shadow-xs' : 'text-[var(--text-muted)] opacity-60'}`}
            >
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
              Cases
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={13} />
            <input
              type="text"
              placeholder="Search graph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-2.5 py-1.5 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[var(--primary)] w-36 focus:w-48 transition-all font-semibold"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-red-500">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Settings Trigger */}
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className={`p-2 bg-[var(--surface-dim)] hover:bg-[var(--border)] rounded-xl text-[var(--text-muted)] border border-[var(--border)] transition-colors cursor-pointer ${showConfig ? 'text-[var(--primary)] border-[var(--primary)]/40 bg-[var(--primary)]/[0.03]' : ''}`}
            title="Tuning Settings"
          >
            <Sliders size={14} />
          </button>

          {/* Reset button */}
          <button
            onClick={handleResetView}
            className="p-2 bg-[var(--surface-dim)] hover:bg-[var(--border)] rounded-xl text-[var(--text-muted)] border border-[var(--border)] flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
            title="Reset Graph Zoom"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Canvas Workspace */}
      <div className="flex-1 flex overflow-hidden relative" ref={containerRef}>
        
        {/* Force settings adjustment panel */}
        <AnimatePresence>
          {showConfig && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute left-4 top-4 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl shadow-lg z-20 w-64 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--text)]">Simulation Weights</span>
                <button onClick={() => setShowConfig(false)} className="text-[var(--text-muted)] hover:text-red-500">
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-extrabold text-[var(--text-muted)]">
                  <span>Repulsion Charge</span>
                  <span>{chargeStrength}</span>
                </div>
                <input 
                  type="range" 
                  min="-400" 
                  max="-50" 
                  value={chargeStrength} 
                  onChange={(e) => setChargeStrength(Number(e.target.value))}
                  className="w-full accent-[var(--primary)] h-1 bg-[var(--surface-dim)] rounded-lg appearance-none cursor-pointer" 
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-extrabold text-[var(--text-muted)]">
                  <span>Link Distance</span>
                  <span>{linkDistance}px</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="150" 
                  value={linkDistance} 
                  onChange={(e) => setLinkDistance(Number(e.target.value))}
                  className="w-full accent-[var(--primary)] h-1 bg-[var(--surface-dim)] rounded-lg appearance-none cursor-pointer" 
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-extrabold text-[var(--text-muted)]">
                  <span>Collision Buffer</span>
                  <span>{collisionRadius}px</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="60" 
                  value={collisionRadius} 
                  onChange={(e) => setCollisionRadius(Number(e.target.value))}
                  className="w-full accent-[var(--primary)] h-1 bg-[var(--surface-dim)] rounded-lg appearance-none cursor-pointer" 
                />
              </div>

              <p className="text-[9px] text-[var(--text-muted)] italic font-semibold leading-normal">
                Adjust sliders to separate high-density disciplines or compress the visualization structure. Drag nodes freely to freeze positions.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover tooltips */}
        {hoveredNode && (
          <div className="absolute left-4 bottom-4 bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] p-3 rounded-xl shadow-md z-20 max-w-sm pointer-events-none transition-all">
            <div className="flex items-center gap-1.5 mb-1">
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: hoveredNode.color }}
              />
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                {hoveredNode.type}
              </span>
            </div>
            <h4 className="text-xs font-extrabold text-[var(--text)]">{hoveredNode.label}</h4>
            <p className="text-[10px] text-[var(--text-muted)] font-semibold mt-1 leading-normal line-clamp-2">
              {hoveredNode.description || 'Interactive mapped node in the learning curriculum graph.'}
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="absolute right-4 top-4 bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] px-3 py-2.5 rounded-xl shadow-sm z-10 text-[9px] font-bold text-[var(--text-muted)] space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Root Curriculum Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Subjects / Fields</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span>Subfolders & Units</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Diseases & Disorders</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Real Clinical Cases</span>
          </div>
          <div className="border-t border-[var(--border)] pt-1.5 flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-[var(--primary)] font-black">
            <div className="w-4 border-t border-dashed border-[var(--primary)]" />
            <span>Integration Channel</span>
          </div>
        </div>

        {/* Actual SVG viewport */}
        <svg 
          ref={svgRef} 
          className="w-full h-full bg-[var(--bg)]/30"
          style={{ cursor: 'grab' }}
        />

        {/* Educational details sidebar */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--surface)] border-l border-[var(--border)] shadow-xl z-20 p-6 overflow-y-auto flex flex-col justify-between"
            >
              {/* Sidebar Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Info size={11} /> Node Intelligence
                  </span>
                  <button 
                    onClick={() => {
                      setSelectedNode(null);
                      d3.selectAll('.node-circle').attr('stroke', 'var(--bg)').attr('stroke-width', 2);
                    }} 
                    className="p-1 hover:bg-[var(--surface-dim)] rounded-lg text-[var(--text-muted)] hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Node Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white shadow-xs"
                      style={{ backgroundColor: selectedNode.color || 'var(--primary)' }}
                    >
                      {selectedNode.type}
                    </span>
                    {selectedNode.group && (
                      <span className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase">
                        {selectedNode.group.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-black text-[var(--text)] tracking-tight leading-tight">
                    {selectedNode.label}
                  </h3>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed bg-[var(--bg)]/40 border border-[var(--border)]/40 p-3 rounded-xl italic">
                    {selectedNode.description || 'Selected node is fully mapped within the clinical educational ontology.'}
                  </p>
                </div>

                {/* Mapped metadata depending on type */}
                <div className="space-y-4 pt-2">
                  {selectedNode.type === 'unit' && selectedNode.data && (
                    <div className="bg-[var(--surface-dim)]/50 p-4 border border-[var(--border)] rounded-xl space-y-2.5">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Unit Summary</span>
                      <div className="flex justify-between text-xs font-bold text-[var(--text)]">
                        <span>Expected Study Time:</span>
                        <span className="text-[var(--primary)]">{selectedNode.data.estimatedHours} Hours</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                        This subfolder is focused on board preparation, OSCE training, and pharmacology workflows. Write notes and upload slides to unlock the AI Study Assistant.
                      </p>
                    </div>
                  )}

                  {selectedNode.type === 'condition' && (
                    <div className="bg-[var(--surface-dim)]/50 p-4 border border-[var(--border)] rounded-xl space-y-3 text-xs font-semibold">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Curriculum Alignment</span>
                      <p className="text-[11px] text-[var(--text-muted)] leading-normal font-medium">
                        This disease condition is cross-linked with Pharmacology (ADME & pharmacodynamics) and Therapeutics (care plans & renal restrictions).
                      </p>
                      
                      {/* Show matching case if any */}
                      <div className="pt-2 border-t border-[var(--border)]/60">
                        <span className="text-[9px] font-black uppercase text-rose-500 tracking-wider block mb-1.5">Connected Patient Cases</span>
                        {INITIAL_CASES.filter(c => c.disease === selectedNode.label).map(c => (
                          <div 
                            key={c.id} 
                            onClick={() => {
                              setSelectedNode(null);
                              navigate(`/cases?caseId=${c.id}`);
                            }}
                            className="p-2 border border-rose-200/50 hover:border-rose-400/60 bg-rose-500/[0.02] rounded-lg cursor-pointer flex justify-between items-center transition-colors group"
                          >
                            <span className="text-[11px] font-extrabold text-slate-700 truncate">{c.patientName} ({c.difficulty})</span>
                            <ChevronRight size={12} className="text-rose-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNode.type === 'case' && selectedNode.data && (
                    <div className="bg-[var(--surface-dim)]/50 p-4 border border-[var(--border)] rounded-xl space-y-2 text-xs font-semibold">
                      <span className="text-[9px] font-black uppercase text-rose-500 tracking-wider block">Clinical Snapshot</span>
                      
                      <div className="flex justify-between text-[11px] border-b border-[var(--border)] pb-1.5">
                        <span className="text-[var(--text-muted)] font-extrabold">Patient:</span>
                        <span className="text-[var(--text)] font-extrabold">{selectedNode.data.patientName}</span>
                      </div>
                      <div className="flex justify-between text-[11px] border-b border-[var(--border)] pb-1.5">
                        <span className="text-[var(--text-muted)] font-extrabold">Demographics:</span>
                        <span className="text-[var(--text)] font-extrabold">{selectedNode.data.demographics}</span>
                      </div>
                      <div className="flex justify-between text-[11px] border-b border-[var(--border)] pb-1.5">
                        <span className="text-[var(--text-muted)] font-extrabold">Diagnosis:</span>
                        <span className="text-rose-600 font-extrabold truncate max-w-[150px]" title={selectedNode.data.diagnosis}>{selectedNode.data.diagnosis}</span>
                      </div>
                      
                      <p className="text-[10px] text-[var(--text-muted)] font-medium leading-normal pt-1.5">
                        <strong>Chief Complaint:</strong> {selectedNode.data.chiefComplaint}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Footer Operations */}
              <div className="pt-6 border-t border-[var(--border)] shrink-0">
                {selectedNode.type === 'case' && selectedNode.data && (
                  <button
                    onClick={() => {
                      setSelectedNode(null);
                      navigate(`/cases?caseId=${selectedNode.data.id}`);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl text-xs font-extrabold shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play size={13} fill="currentColor" /> Simulate Clinical Case
                  </button>
                )}

                {selectedNode.type === 'unit' && selectedNode.data && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-[var(--text-muted)] italic text-center font-semibold mb-1">
                      Drag and drop files to start compiling guides.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleResetView}
                        className="flex-1 py-2 bg-[var(--surface-dim)] border border-[var(--border)] hover:bg-[var(--border)] text-[var(--text)] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Reset Map
                      </button>
                    </div>
                  </div>
                )}

                {selectedNode.type === 'subject' && (
                  <button
                    onClick={() => {
                      // Simulates click back to trigger module view
                      setSelectedNode(null);
                      // Trigger direct subject selection logic in parent view if linked
                      const matchingMod = MODULES.find(m => m.id === selectedNode.id);
                      if (matchingMod) {
                        const card = document.getElementById(`module-card-${matchingMod.id}`);
                        if (card) card.click();
                      }
                    }}
                    className="w-full py-2.5 bg-[var(--primary)] text-white hover:opacity-95 text-xs font-extrabold rounded-xl shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <BookOpen size={13} /> Explore Subject Units
                  </button>
                )}

                {!['case', 'unit', 'subject'].includes(selectedNode.type) && (
                  <button
                    onClick={handleResetView}
                    className="w-full py-2.5 bg-[var(--surface-dim)] hover:bg-[var(--border)] text-[var(--text)] border border-[var(--border)] text-xs font-extrabold rounded-xl transition-colors cursor-pointer"
                  >
                    Reset Map Perspective
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
