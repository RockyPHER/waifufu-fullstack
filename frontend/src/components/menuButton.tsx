export default function MenuButton() {
  const width = 34;
  const height = 6;
  const gap = 20;
  const color = "black";

  const barStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    borderRadius: "9999px",
    transition: "all 0.3s ease",
    gap: gap,
  };

  function handleClick() {}
  return (
    <>
      <button className="w-" onClick={}>
        <div className="flex flex-col gap-1">
          <div style={barStyle} />
          <div style={barStyle} />
          <div style={barStyle} />
        </div>
      </button>
    </>
  );
}
