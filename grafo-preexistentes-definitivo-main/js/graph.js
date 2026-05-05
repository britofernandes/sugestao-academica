/**
 * Creates a node in the sigma.js graph with default properties
 */
export function createNode(graph, name, options = {}) {
    const defaults = {
        size: 8.0,
        color: '#999999',
        type: 'circle', // ⚠️ troquei de 'image' para 'circle' para evitar erro de imagem
        imageFolder: 'images/',
        imageExtension: '.jpg',
        label: name,
        labelColor: options.color || '#999999'
    };
    
    const config = { ...defaults, ...options };
    
    if (!options.labelColor && options.color) {
        config.labelColor = options.color;
    }
    
    const nodeConfig = {
        size: config.size,
        label: config.label,
        type: config.type,
        color: config.color,
        labelColor: config.labelColor
    };

    // Só adiciona imagem se for tipo image
    if (config.type === 'image') {
        nodeConfig.image = `${config.imageFolder}${name}${config.imageExtension}`;
    }
    
    graph.addNode(name, nodeConfig);
}

/**
 * Creates multiple nodes at once
 */
export function createNodes(graph, nodeList) {
    nodeList.forEach(node => {
        if (typeof node === 'string') {
            createNode(graph, node);
        } else {
            createNode(graph, node.name, node.options || {});
        }
    });
}

/**
 * Creates an edge in the sigma.js graph
 */
export function createEdge(graph, source, target, options = {}) {
    const defaults = {
        type: 'line',
        weight: 1.0,
        label: '',
        size: 2,
        color: '#999999'
    };
    
    const config = { ...defaults, ...options };
    
    graph.addEdge(source, target, config);
}

/**
 * Creates multiple edges at once
 */
export function createEdges(graph, edgeList) {
    edgeList.forEach(edge => {
        createEdge(graph, edge.source, edge.target, edge.options || {});
    });
}