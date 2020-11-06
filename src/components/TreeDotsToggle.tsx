import React from 'react';
import treeDotsVerticalIcon from '../icons/TreeDotsVertical.svg';

// @ts-ignore
const TreeDotsToggle = React.forwardRef(({children, onClick}, ref: any) => (
    <div
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        <div className="tree-dots-menu">
            <img src={treeDotsVerticalIcon} alt="menu" className="mb-1"/>
        </div>
    </div>
));

export default TreeDotsToggle
