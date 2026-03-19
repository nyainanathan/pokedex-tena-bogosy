import './globals.css'

export default function RootLayout({ children } : {children : React.ReactNode}) {

  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pokedex v2</title>
    </head>
    <body>
      <div
        className='flex flex-col items-center p-3'
      >
        <p className='text-4xl'>Pokedex tena bogosy be ;D</p>
      </div>
      {children}
    </body>
    </html>
  )
}