export default function LoadingFallback() {
    return (
        <div className="w-full h-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    )
};