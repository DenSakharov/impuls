import { tPackageAttributes } from '#/dtos/tPackageAttributes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const usePackages = (projectId: string | undefined, isOpen: boolean) : tPackageAttributes[] => {
    const [packages, setPackages] = useState<tPackageAttributes[]>([]);
    useEffect(() => {
        if(!isOpen) return
        if(!projectId) return
        axios.get(
                "http://" + window.location.hostname + ":3010/projects/" + projectId + "/packages",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            ).then(({ data }: {data: tPackageAttributes[]}) => {
                setPackages(data);
            }).catch((err) => console.log(err));

    }, [isOpen, projectId]);
    return packages
}

export default usePackages;