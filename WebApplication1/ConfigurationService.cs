namespace WebApplication1
{
    public static class ConfigurationService
    {
        public static IConfiguration AppSetting
        {
            get;
        }
        static ConfigurationService()
        {
            AppSetting = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
        }
    }
}
