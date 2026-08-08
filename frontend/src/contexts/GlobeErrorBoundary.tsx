import React from 'react';

interface Props { children: React.ReactNode; resetKey?: unknown;}
interface State { hasError: boolean; }

export default class GlobeErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(error: unknown, info: unknown) {
        console.error('Globe render error:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-[400px] md:h-[650px] w-full items-center justify-center text-white/70 text-sm">
                    Peta interaktif alumni sedang tidak dapat ditampilkan.
                </div>
            );
        }
        return this.props.children;
    }
}