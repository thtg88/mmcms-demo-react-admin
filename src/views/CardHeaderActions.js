import React from 'react';
import { Link } from 'react-router-dom';

const CardHeaderActions = ({ actions }) => {
    // console.log(actions);

    return (
        <div className="card-header-actions">
            {actions.map((action, idx) => {

                // console.log(action);

                return (
                    <Link
                        key={idx}
                        to={action.href}
                        className="card-header-action btn btn-outline-success btn-setting"
                        title={action.title}
                        aria-label={action.title}
                    ><i className={action.iconClassName}></i></Link>
                );
            })}
        </div>
    )
};

export default CardHeaderActions;
