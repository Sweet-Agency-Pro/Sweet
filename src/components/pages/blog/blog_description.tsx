
import './blog_pres.css'
function BlogDescription({
     text,
     images
}: {
    text: string;
    images: {
        image_id: string;
        url: string;
    }[];
}) {
    const parts = text.split(/(\[\{image:\d+\}\])/g);

    return (
        <>
            {parts.map((part, index) => {
                const match = part.match(/\[\{image:(\d+)\}\]/);

                if (match) {
                    const imageIndex = Number(match[1]) - 1;

                    return images[imageIndex]?.url ? (
                        <div key={index} className='image_container'>
                            <img
                                className='image_view'
                                src={images[imageIndex].url}
                                alt={`Image ${imageIndex + 1}`}
                            />
                        </div>
                    ) : null;
                }

                return <p key={index}>{part}</p>;
            })}
        </>
    );
}

export default BlogDescription;