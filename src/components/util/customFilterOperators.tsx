// Define the custom filter operator for the "stage" column
export const stageFilterOperator =  {
    label: 'Stage',
    value: 'stageOperator',  // Unique value for this operator
    // @ts-ignore
    getApplyFilterFn: (filterItem) => {
        if (!filterItem.value || filterItem.value === '') {
            return null;
        }
        return (value: "Prospecting" | "Negotiation" | "Closing" ) => {
            console.log(value);
            console.log(filterItem);
            return value === filterItem.value;
        };
    },
    // @ts-ignore
    InputComponent: (props) => {
        return (
            <select
                value={props.item.value || ''}
                onChange={(event) => props.applyValue({ ...props.item, value: event.target.value })}
                className="border-b border-b-black pl-2 items-end pb-[5px] w-full h-full"
            >
                <option value="">--Select Stage--</option>
                <option value="Prospecting">Prospecting</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closing">Closing</option>
            </select>
        );
    },
    InputComponentProps: {
        type: 'string',
    },
};

export const statusFilterOperator = {
    label: 'Stage',
    value: 'stageOperator',  // Unique value for this operator
    // @ts-ignore
    getApplyFilterFn: (filterItem) => {
        if (!filterItem.value || filterItem.value === '') {
            return null;
        }
        return (value: "Prospecting" | "Negotiation" | "Closing" ) => {
            console.log(value);
            console.log(filterItem);
            return value === filterItem.value;
        };
    },
    // @ts-ignore
    InputComponent: (props) => {
        return (
            <select
                value={props.item.value || ''}
                onChange={(event) => props.applyValue({ ...props.item, value: event.target.value })}
                className="border-b border-b-black pl-2 items-end pb-[5px] w-full h-full"
            >
                <option value="">--Select Status--</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
            </select>
        );
    },
    InputComponentProps: {
        type: 'string',
    },
};