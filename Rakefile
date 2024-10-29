#Manual: https://github.com/gjtorikian/html-proofer
require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  options = {
    :assume_extension => true,
    :check_html => true,
    :check_img_http => true,
    :disable_external => true,
    :enforce_https => true,
    :ignore_empty_alt => true,
    :report_invalid_tags => true
  }
  HTMLProofer.check_directory("./_site", options).run
end
