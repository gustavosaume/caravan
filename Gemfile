ruby '2.1.2'
source 'https://rubygems.org'
gem 'bundler', '~> 1.8.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'
gem 'mongoid', '~> 4.0.2'
gem 'faker', '~> 1.4.3'

gem 'haml-rails', '~> 0.8.2'
gem 'sass-rails', '~> 5.0'
gem 'compass-rails', '~> 2.0.4'
gem 'modular-scale', '~> 2.0.6'
gem 'breakpoint', '~> 2.5.0'
gem 'susy', '~> 2.2.2'
gem 'uglifier', '>= 1.3.0'
gem 'font-awesome-rails', '~> 4.3.0.0'

source 'https://rails-assets.org' do
  gem 'rails-assets-ractive', '~> 0.7.0'
  gem 'rails-assets-ractive-events-tap'
  gem 'rails-assets-ractive-transitions-fade'
end

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# gem 'turbolinks'

gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

gem 'puma'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
group :production do
  gem 'rails_12factor'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
