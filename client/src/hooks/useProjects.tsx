import { tProjectAttributes } from '#/dtos/tProjectAttributes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useProjects = () => {
    const [projects, setProjects] = useState<tProjectAttributes[]>([]);
    useEffect(()=>{        
        axios.get(`http://${window.location.hostname}:3010/projects`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then(({ data }) => {
                setProjects(data);
            })
            .catch((err) => console.log("Get projects error", err) );
    }, [])

    return {projects}
}

export default useProjects;