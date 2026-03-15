export default function Card( {title, description}: {title: string, description: string}) {

    return (
        <div className="rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
    )
}