import React from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { Container } from '@mui/material';

export default function MuiTree(data: any) {
    const tree = data.projectData
    const renderTree = (node: any) => (
        <TreeItem 
        itemId={node.name} 
        label={node.name} 
        key={node.name}
        sx={{textAlign:"left"}}
        onClick={() => node.object ? window.open('/Popup?id=' + node.object.id) : null}
        >
            {Object.keys(node).map((key) => Array.isArray(node[key]) ? node[key].map((child: any) => renderTree(child)) : null)}
        </TreeItem>
    )
  return (
    
     <Container>
        <SimpleTreeView 
        defaultExpandedItems={[tree.name]}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
            {renderTree(tree)}
        </SimpleTreeView>
    </Container>
  );
}