import { tProjectAttributes } from '#/dtos/tProjectAttributes';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useProjects = () => {
    const getProjects = useCallback(() => {
        setLoading(true);       
        setError(false);       
        axios.get(`http://${window.location.hostname}:3010/projects`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then(({ data }) => {
                setProjects(data);
                setLoading(false);
                setError(false);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
            });
    }, [])
    const [projects, setProjects] = useState<tProjectAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(()=>{ 
        getProjects()
    }, [getProjects])

    return {projects, loading, error, reload: getProjects}
}

export default useProjects;