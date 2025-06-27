import { Card, CardContent } from "@/components/ui/card";

export const AuthCard = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <Card className="w-full max-w-md border-cyan-500 bg-gray-900 text-white shadow-xl">
            <CardContent className="p-6 space-y-4">{children}</CardContent>
        </Card>
    </div>
);
