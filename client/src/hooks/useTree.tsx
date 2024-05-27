import { tPackageAttributes } from '#/dtos/tPackageAttributes';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useTree = (projectId: string | undefined) => {
    const nodeToPackage = (node: any): tPackageAttributes => {
        return {
            ...(node.packageObject ?? {}),
            objects: node.objects ?? [],
            children: node.children.map((node) => nodeToPackage(node)) ?? [],
        }
    }
    const getTree = useCallback(
        (projectId: string) => {
            axios.get(`http://${window.location.hostname}:3010/projects/${projectId}/packages/tree`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then(({ data }) => {                    
                    setProjectData(data.map((node) => nodeToPackage(node)));
                })
                .catch((err) => console.log(err));
        },
        [],
    )
    const [projectData, setProjectData] = useState<tPackageAttributes[]>([]);
    useEffect(() => {
        if (!projectId) {
            setProjectData([]);
            return;
        }
        getTree(projectId)
    }, [getTree, projectId]);

    return {tree: projectData, getTree}
}

export default useTree;