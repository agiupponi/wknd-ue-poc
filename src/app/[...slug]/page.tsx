import React from 'react';
import AEMPage from '../../components/AEMPage';
import { getAEMPath } from '../../utils/commons';

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function Page(props: PageProps) {
    const params = await props.params;
    const slug = params.slug;
    const aemPath = getAEMPath(slug);

    return (
        <AEMPage path={aemPath} />
    );
}
