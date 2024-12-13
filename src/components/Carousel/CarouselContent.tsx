import { PropsWithChildren } from "react";
import { useOnToggleToFalse } from "../../hooks/useOnChange";
import useOnScreen, { ExitDirection } from "../../hooks/useOnScreen";

type Props = {
    onItemVisibilityChange: (exitDirection: ExitDirection) => void;
    order: number;
}

export function CarouselContent(props: PropsWithChildren<Props>) {
    const { children, onItemVisibilityChange, order } = props;
    const {ref, isOnScreen, exitDirection } = useOnScreen(0);
    
    useOnToggleToFalse(isOnScreen, () => {
        onItemVisibilityChange(exitDirection);
    })

    // TODO: Need to enforce a width so that the when a child isn't rendered we continue to use the same space
    // For now we just render it all
    return <div style={{ marginRight: '10px', order }} ref={ref}>{children}</div>
}