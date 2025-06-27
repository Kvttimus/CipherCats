import { Link } from "react-router-dom";

export const AuthHeader = ({
    title,
    subtitle,
    linkText,
    linkHref,
    }: {
        title: string;
        subtitle: string;
        linkText: string;
        linkHref: string;
    }) => (
        <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-cyan-400">{title}</h2>
            <p className="text-sm text-gray-400">
                {subtitle}{" "}
                <Link to={linkHref} className="text-cyan-300 hover:underline">
                    {linkText}
                </Link>
            </p>
        </div>
);
