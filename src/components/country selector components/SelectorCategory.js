import React from 'react';

function SelectorCategory({ index, setCategory, toggleCollapsible, title, className, content }) {
    return (
        <React.Fragment>
            <button type='button' className='selector__collapsible' onClick={() => { toggleCollapsible(index); setCategory(title) }}>
                {title}
            </button>
            <div className={className}>
                {content}
            </div>
        </React.Fragment>
    )
}

export default SelectorCategory;