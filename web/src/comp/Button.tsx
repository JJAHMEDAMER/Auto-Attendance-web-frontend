type propTypes = {
    text: string
}

export const Button = ({ text }: propTypes) => {
    return (
        <button
            className="
                    font-semibold p-2 mt-3 bg-pink-600 rounded-full shadow-md
                    hover:bg-pink-500 hover:shadow-lg"
        >
            {text}
        </button>
    )
}
