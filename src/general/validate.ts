


export const maxLengthVC = (maxLength: number) => (value: any=1) => {
    return value.length > maxLength ? `max length for this field is ${maxLength}, but your is ${value.length}` : undefined
}