import { Textarea } from "./textarea";

type DTextAreaProps = {
    leftString: string;
    rightString: string;
};


export const DTextArea: React.FC<DTextAreaProps> = ({
    leftString,
    rightString,
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <Textarea readOnly className="w-full sm:w-1/2" value={leftString}/>
            <Textarea readOnly className="w-full sm:w-1/2" value={rightString}/>
        </div>
    );
};
