import React from 'react'

const Dropdown = (
  { isOpen, children, toggle, top, right, bottom, left },
  ref,
) => {
  const position = {
    'top-0': top,
    'left-0': right,
    'bottom-0': bottom,
    'right-0': left,
  }

  const positionClasses = Object.keys(position)
    .filter((key) => position[key])
    .join(' ')

  return (
    <div className="relative inline-block w-45">
      <div className="flex items-center justify-center rounded-full w-7 h-7 hover:bg-violet-200">
        <i className="fas fa-ellipsis-h" onClick={toggle}></i>
        {isOpen && (
          <div
            ref={ref}
            className={`absolute z-10 flex flex-col w-40 bg-white shadow-md cursor-pointer h-fit ${positionClasses}`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default React.forwardRef(Dropdown)
