import React, { useState } from 'react';
import CardSkeleton from './CardSkeleton';

interface IOwnProps {
    number: number;
}

const MultiCardSkeleton: React.FC<IOwnProps> = ({ number }) => {
    return (
        <>
            {[...Array(number)].map(() => (
                <CardSkeleton />
            ))}
        </>
    );
};

export default MultiCardSkeleton;
