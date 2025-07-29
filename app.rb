# frozen_string_literal: true

# PSP Environment - Modern Grid System Application
# Built with standard Sinatra routing patterns
# Created by Pattaya Upara (everysundays@gmail.com)

require 'sinatra'
require 'sinatra/reloader' if development?
require 'bundler/setup'

class PSPEnvironmentApp < Sinatra::Base
  # Enable reloader in development
  configure :development do
    register Sinatra::Reloader
  end

  # Configure static files
  set :public_folder, File.dirname(__FILE__) + '/public'
  set :static, true
  
  # Enable serving files from plugins directory
  get '/plugins/*' do
    file_path = File.join(File.dirname(__FILE__), 'plugins', params['splat'].first)
    if File.exist?(file_path) && File.file?(file_path)
      content_type_for_file = case File.extname(file_path)
      when '.css' then 'text/css'
      when '.js' then 'application/javascript'
      when '.json' then 'application/json'
      else 'text/plain'
      end
      content_type content_type_for_file
      File.read(file_path)
    else
      halt 404, "File not found"
    end
  end

  # ========================================
  # PAGE ROUTES
  # ========================================

  # Home page
  get '/' do
    erb :index
  end

  # Grid system demo page
  get '/demo' do
    erb :demo
  end

  # ========================================
  # API ROUTES
  # ========================================

  # Grid system information API
  get '/api/grid-info' do
    content_type :json
    {
      system: 'Modern Rack & Rail Grid System',
      version: '2.0.0-tdd',
      features: [
        'CSS Grid (Rack) and Flexbox (Rail) containers',
        'Mobile-first responsive design',
        'Perfect centering with offset utilities',
        'Comprehensive test coverage with Jest',
        'Tailwind v4 CSS-first configuration'
      ],
      breakpoints: {
        sm: { min: 375, max: 767 },
        md: { min: 768, max: 1023 },
        lg: { min: 1024, max: 1279 },
        xl: { min: 1280, max: 'infinity' }
      },
      grid_system: {
        columns: 12,
        base_gap: '1rem',
        container_padding: '1.5rem'
      },
      author: 'Pattaya Upara (everysundays@gmail.com)',
      created_at: '2025-07-25'
    }.to_json
  end

  # ========================================
  # ERROR HANDLERS
  # ========================================

  # 404 handler
  not_found do
    erb :not_found rescue "Page not found"
  end

  # Error handler
  error do
    erb :error rescue "An error occurred"
  end
end

# Start the application
PSPEnvironmentApp.run! if __FILE__ == $0

