require "rubygems"

require "rack"
require "middleman/rack"
require "rack/contrib/try_static"

# Build the static site when the app boots
'bundle exec middleman build'

# Enable proper HEAD responses
use Rack::Head
# Attempt to serve static HTML files
use Rack::TryStatic,
    :root => "tmp",
    :urls => %w[/],
    :try => ['.html', 'index.html', '/index.html']
}

