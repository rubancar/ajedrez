package es.uv.twcam.pls.bug.model;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;

import es.uv.twcam.pls.ajedrez.model.Bug;
import es.uv.twcam.pls.ajedrez.model.BugException;
import es.uv.twcam.pls.ajedrez.model.BugFactory;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

@TestMethodOrder(OrderAnnotation.class)
class BugFactoryTest {
	
	static String id = null;

	@Test
	@Order(1)
	void testCreateBug() throws BugException {
		
		Bug bug1 = new Bug(null,"name","message");
		Bug bug2 = BugFactory.getInstance().create(bug1);
		
		BugFactoryTest.id = bug1.getId();
		
		assertNotNull(BugFactoryTest.id);
		assertEquals(bug1.getIssueName(), bug2.getIssueName());
		assertEquals(bug1.getIssueMessage(), bug2.getIssueMessage());
		
	}

	@Test
	@Order(2)
	void testListAll() {
		
		List<Bug> bugs = BugFactory.getInstance().listAll();
		
		assertTrue(bugs.size()>0);
	}

	@Test
	@Order(3)
	void testFind() {
		Bug bug = BugFactory.getInstance().find(BugFactoryTest.id);
		assertNotNull(bug);
	}
	
	@Test
	@Order(4)
	void testUpdateBug() throws BugException {
		Bug bug1 = BugFactory.getInstance().find(BugFactoryTest.id);
		bug1.setIssueMessage("Message2");
		Bug bug2 = BugFactory.getInstance().update(bug1);
		
		assertEquals(bug1.getIssueName(), bug2.getIssueName());
		assertEquals(bug1.getIssueMessage(), bug2.getIssueMessage());
		
	}

	@Test
	@Order(5)
	void testDeleteBug() throws BugException {
		BugFactory.getInstance().delete(BugFactoryTest.id);
		Bug bug = BugFactory.getInstance().find(BugFactoryTest.id);
		assertNull(bug);
	}

}
