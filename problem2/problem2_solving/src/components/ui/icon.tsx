import { cn } from "@/utils/cn";

interface RawIconProps {
    className?: string;
    size: number;
    src: string;
    isImage?: boolean;
}

const RawIcon = ({ className, size, src, isImage }: RawIconProps) => {
    const sizeInPx = `${size}px`;

    const style: React.CSSProperties = {
        width: sizeInPx,
        height: sizeInPx,
        backgroundImage: isImage ? `url("${src}")` : undefined,
        WebkitMaskImage: isImage ? undefined : `url("${src}")`,
        maskImage: isImage ? undefined : `url("${src}")`,
    };

    return <span className={cn("ic-raw", className)} style={style} />;
}

export default RawIcon;
