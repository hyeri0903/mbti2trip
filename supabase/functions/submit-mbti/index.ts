   // Edge Function 예시 (Deno)
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
   import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

   serve(async (req) => {
     // 1. reCAPTCHA 검증 등 추가 로직
     const { mbti, recaptchaToken } = await req.json();

     // 예: reCAPTCHA 검증 (구글 API 호출)
     // if (!isValidRecaptcha(recaptchaToken)) {
     //   return new Response(JSON.stringify({ error: "Invalid captcha" }), { status: 400 });
     // }

     // 2. Supabase 서비스 키로 DB 접근
     const supabase = createClient(
       Deno.env.get("SUPABASE_URL")!,
       Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
     );

     // 3. insert 실행
     const { error } = await supabase
       .from("test_results")
       .insert([{ mbti }]);

     if (error) {
       return new Response(JSON.stringify({ error: error.message }), { status: 400 });
     }

     return new Response(JSON.stringify({ success: true }), { status: 200 });
   });