export default function Loading() {
  return (
    <div aria-busy="true" className="shell space-y-8 py-20">
      <div className="h-5 w-36 animate-pulse bg-muted" />
      <div className="h-20 max-w-xl animate-pulse bg-muted" />
      <div className="h-8 max-w-md animate-pulse bg-muted" />
      <div className="h-96 animate-pulse bg-muted" />
    </div>
  );
}
