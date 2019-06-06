const createActionName = (reducerName, actionName) =>
    `${reducerName}/${actionName}`;

export default createActionName;
