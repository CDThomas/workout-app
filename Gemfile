source 'https://rubygems.org'

ruby '2.3.3'
# See https://devcenter.heroku.com/articles/ruby-versions for more information.

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.2'
gem 'pg'
gem 'puma', '~> 3.0'
gem 'uglifier', '>= 1.3.0'
gem 'sass-rails', '~> 5.0'

gem 'react_on_rails', '~>6'         # use latest gem version > 6
gem 'active_model_serializers', '~> 0.10.0'
gem 'knock'
gem 'bcrypt', '~> 3.1.7'

group :development, :test do
  gem 'rspec-rails', '~> 3.5'
  gem 'factory_girl_rails', "~> 4.0"
  gem 'byebug', platform: :mri
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'awesome_print'
end

group :test do
  gem 'shoulda-matchers', '~> 3.0'
  gem 'database_cleaner'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'mini_racer', platforms: :ruby
