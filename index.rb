require 'sinatra'
 
 get '/' do
   time = Time.new
   @no_cache = "#{time.sec}-#{time.min}-#{time.hour}"
   
   if request.url.include? 'patrickdevivo.com'
     @fb_app_id = '286802868014878'
   else
     @fb_app_id = '277750495581593'
      
   end
   erb :index
 end