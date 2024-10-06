
export const TestCard = ({text = 'text'}: {text: string}) => {
  return (
    <div className="w-72 h-80 bg-fuchsia-600 rounded-lg text-center">
      <p className="font-bold">{text}</p>
    </div>
  )
}