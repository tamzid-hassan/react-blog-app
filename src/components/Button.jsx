
function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button type={type} className={`px-4 py-2 rounded ${bgColor} ${textColor} ${className}`}{...props}>
            {children}
        </button>
    )
}

export default Button