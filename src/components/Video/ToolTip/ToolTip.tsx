
const ToolTip = (props:any) => {
  const {text, keyname} = props
  return (
    <>
    <span className={`tooltip-text invisible absolute text-xs text-slate-200 font-medium bottom-16 bg-[rgba(0,0,0,0.6)] px-2 py-1 rounded-[4px] whitespace-nowrap ${props.right && "right-0"} ${props.left && "left-0"}`}>
      {`${text} (${keyname})`}
    </span>
    </>
  )
}

export default ToolTip