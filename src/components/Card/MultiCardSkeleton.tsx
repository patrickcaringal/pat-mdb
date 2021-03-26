import React, { useState } from 'react';
import CardSkeleton from './CardSkeleton';

interface IOwnProps {
    number: number;
    type?: 'normal' | 'baseless';
}

const MultiCardSkeleton: React.FC<IOwnProps> = ({ type = 'normal', number }) => {
    return (
        <>
            {[...Array(number)].map(() => (
                <CardSkeleton />
            ))}
        </>
    );
};

export default MultiCardSkeleton;
