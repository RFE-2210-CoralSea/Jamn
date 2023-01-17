-- AddForeignKey
ALTER TABLE "instruments" ADD CONSTRAINT "instruments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
