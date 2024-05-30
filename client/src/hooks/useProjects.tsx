import { tProjectAttributes } from '#/dtos/tProjectAttributes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useProjects = () => {
    const [projects, setProjects] = useState<tProjectAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(()=>{ 
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

    return {projects, loading, error}
}

export default useProjects;