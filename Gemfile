# Swiftbird Internet Pvt Ltd Documentation Gemfile
# Constitutional Compliance: Standard Jekyll setup for GitHub Pages

source "https://rubygems.org"

# Jekyll and plugins
gem "jekyll", "~> 4.3"
gem "minima", "~> 2.5"

# Essential plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Development gems
group :development, :test do
  gem "html-proofer"
  gem "webrick", "~> 1.7"
end

# Windows and JRuby specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]