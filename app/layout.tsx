import './globals.css'

export default function RootLayout({ children } : {children : React.ReactNode}) {

  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pokedex v2</title>
    </head>
    <body>
        <p className='text-4xl w-full text-center text-white bg-[#0b1c34] p-2'>Pokedex tena bogosy be ;D</p>
      {children}
    </body>
    </html>
  )
}