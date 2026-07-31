function BlogDescription({
     text,
     images
}: {
    text: string;
    images: string[];
}) {
    const parts = text.split(/(\[\{image:\d+\}\])/g);

    return (
        <>
            {parts.map((part, index) => {
                const match = part.match(/\[\{image:(\d+)\}\]/);

                if (match) {
                    const imageIndex = Number(match[1]) - 1;

                    return images[imageIndex] ? (
                        <img
                            key={index}
                            src={images[imageIndex]}
                            alt={`Image ${imageIndex + 1}`}
                        />
                    ) : null;
                }

                return <p key={index}>{part}</p>;
            })}
        </>
    );
}

export default BlogDescription;