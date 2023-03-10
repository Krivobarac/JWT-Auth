using StackExchange.Redis;

namespace WebApplication1.Cache
{
    public class ConnectionHelper
    {
        static ConnectionHelper()
        {
            ConnectionHelper.redis = ConnectionMultiplexer.Connect(
            new ConfigurationOptions
            {
                KeepAlive = 0,
                AllowAdmin = true,
                EndPoints = { { "127.0.0.1", 6379 }, { "127.0.0.2", 6379 } },
                ConnectTimeout = 5000,
                ConnectRetry = 5,
                SyncTimeout = 5000,
                AbortOnConnectFail = false,
            });
        }

        private static ConnectionMultiplexer redis;

        public static ConnectionMultiplexer Connection
        {
            get
            {
                return redis;
            }
        }
    }
}
