<?php
namespace TotalVoice;

use TotalVoice\Handler\Http;

class ClientTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var Client
     */
    private $client;

    protected function setUp()
    {
        $this->client = new Client('7338d6b3a783543e6c0788bf92ad34a6', 'http://callcommunity');
    }

    /**
     * @test
     */
    public function constructShouldConfigureTheAttributes()
    {
        $this->assertAttributeSame('7338d6b3a783543e6c0788bf92ad34a6', 'accessToken', $this->client);
        $this->assertAttributeSame('http://callcommunity', 'baseUri', $this->client);
    }

    /**
     * @test
     */
    public function methodBuildRequestShouldInicializeTheCurlResource()
    {
        $route = new Route();
        $resource = $this->client->buildRequest($route, Http::GET);
        $this->assertEquals('object', gettype($resource));
    }

    /**
     * @test
     */
    public function queryTest()
    {
        $query = $this->client->query([]);
        $this->assertEquals('', $query);

        $query = $this->client->query(['query' => 'string']);
        $this->assertEquals("?query=string", $query);
    }
}