// O logo e texto são aplicados diretamente na tela, sem card de fundo.
export default function BrandHeader() {
  return (
    <div className="flex flex-col items-start">
      <img src="https://i.imgur.com/YWUFNgt.png" alt="Biosolvit Logo" className="h-8 w-auto" />
      <p className="text-sm text-gray-600 font-light mt-2">
        Global Impact Dashboard
      </p>
    </div>
  );
}
