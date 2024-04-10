import React from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import data from '../editPopup/data'
import { Container } from '@mui/material';

export default function MuiTree() {
    const tree = data.tree
    const renderTree = (node: any, i : number = 0) => (
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
        defaultExpandedItems={[tree[0].name]}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
            {renderTree(tree[0])}
        </SimpleTreeView>
    </Container>
  );
}