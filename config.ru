use Rack::Static,
  :urls => ["/images", "/js", "/css", "/json"],
  :root => "public"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/blog.html', File::RDONLY)
  ]
}
